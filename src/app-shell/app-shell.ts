import '@material/web/button/filled-button.js';
import '@material/web/button/elevated-button.js';
// import '@material/web/button/filled-tonal-button.js';
// import '@material/web/button/outlined-button.js';
import {ReactiveController, state} from '@snar/lit';
import {cancelSpeech, speakEnglish} from '@vdegenne/speech';
import {LitElement, html} from 'lit';
import {ColorMode, withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html as staticHtml, literal} from 'lit/static-html.js';
import {materialShellLoadingOff} from 'material-shell';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {SUCCESS_AUDIO, WRONG_AUDIO} from '../assets/assets.js';
import {getSettingsDialog, getStatsDialog} from '../imports.js';
import {statsCtrl} from '../stats/statsCtrl.js';
import {type ThemeStore} from '../styles/styles.js';
import {sleep} from '../utils.js';
import styles from './app-shell.css?inline';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

export const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const ROWS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type File = (typeof COLUMNS)[number];
export type Rank = (typeof ROWS)[number];

@saveToLocalStorage('chess-vision:state')
class AppState extends ReactiveController {
	@state() flipped = false;
	@state() showCoords = false;
	@state() coordQuestion = '';
	@state() userAnswer = '';
	@state() speechEnabled = true;
	@state() audioFeedback = true;
	@state() filesToInclude = COLUMNS.slice();
	@state() ranksToInclude = ROWS.slice();

	pickNewCoordinate() {
		this.userAnswer = '';
		const file =
			this.filesToInclude[
				Math.floor(Math.random() * this.filesToInclude.length)
			];
		const rank =
			this.ranksToInclude[
				Math.floor(Math.random() * this.ranksToInclude.length)
			];
		this.coordQuestion = `${file}${rank}`;
		if (appstate.speechEnabled) {
			cancelSpeech();
			speakEnglish(this.coordQuestion);
		}
	}

	toggleSpeech() {
		this.speechEnabled = !this.speechEnabled;
	}

	toggleAudioFeedback() {
		this.audioFeedback = !this.audioFeedback;
	}

	removeFile(file: File) {
		this.filesToInclude.splice(this.filesToInclude.indexOf(file) >>> 0, 1);
		this.requestUpdate();
	}
	addFile(file: File) {
		if (!this.filesToInclude.includes(file)) {
			this.filesToInclude.push(file);
			this.requestUpdate();
		}
	}
	removeRank(rank: Rank) {
		this.ranksToInclude.splice(this.ranksToInclude.indexOf(rank) >>> 0, 1);
		this.requestUpdate();
	}
	addRank(rank: Rank) {
		if (!this.ranksToInclude.includes(rank)) {
			this.ranksToInclude.push(rank);
			this.requestUpdate();
		}
	}
}
export const appstate = new AppState();

@customElement('app-shell')
@withStyles(styles)
export class AppShell extends LitElement {
	@state() themeStore: ThemeStore | undefined = undefined;

	@state() selectedSquare: string | undefined = undefined;

	constructor() {
		super();
		appstate.bind(this);
		appstate.updateComplete.then(async () => {
			if (!appstate.coordQuestion) {
				appstate.pickNewCoordinate();
			}
		});
		import('../styles/styles.js').then(async ({themeStore}) => {
			await sleep(500);
			this.themeStore = themeStore;
			themeStore.bind(this);
		});

		document.addEventListener('keydown', async (event: KeyboardEvent) => {
			if (event.code === 'Space') {
				if (
					window.customElements.get('settings-dialog') &&
					(await getSettingsDialog()).open
				) {
					return;
				}
				appstate.pickNewCoordinate();
			}
		});
	}

	firstUpdated() {
		materialShellLoadingOff.call(this);
	}

	render() {
		const rows = appstate.flipped ? ROWS.slice() : ROWS.slice().reverse();
		const cols = appstate.flipped ? COLUMNS.slice().reverse() : COLUMNS.slice();

		return html`
			<success-failure-rate-linear-progress></success-failure-rate-linear-progress>
			<div id="main-container">
				<header>
					<div
						style="color:var(--md-sys-color-outline-variant);font-size:90%;padding:8px;"
					>
						(shortcuts: ${'<space>'} new question)
					</div>
					<div style="flex:1"></div>
					<md-icon-button
						?disabled=${statsCtrl.statsMap.length === 0}
						title=${statsCtrl.statsMap.length === 0 ? 'not enough data' : ''}
						@click=${async () => {
							const dialog = await getStatsDialog();
							dialog.show();
						}}
					>
						<md-icon>query_stats</md-icon>
					</md-icon-button>
					<md-icon-button
						@click=${() => (appstate.showCoords = !appstate.showCoords)}
					>
						${appstate.showCoords
							? html`<md-icon>visibility</md-icon>`
							: html`<md-icon>visibility_off</md-icon>`}
					</md-icon-button>
					<md-icon-button
						@click=${() => (appstate.flipped = !appstate.flipped)}
					>
						<md-icon>wifi_protected_setup</md-icon>
					</md-icon-button>

					${true
						? html` <md-icon-button
								@click="${() => this.themeStore?.toggleMode()}"
							>
								${this.themeStore?.appliedColorScheme === ColorMode.DARK
									? html`<md-icon>dark_mode</md-icon>`
									: html`<md-icon>light_mode</md-icon>`}
							</md-icon-button>`
						: null}
					<md-icon-button
						@click=${async () => {
							const dialog = await getSettingsDialog();
							dialog.show();
						}}
					>
						<md-icon>settings</md-icon>
					</md-icon-button>
				</header>
				<div id="board">
					${!this.themeStore
						? html`
								<md-circular-progress indeterminate></md-circular-progress>
							`
						: html`
								<md-elevation></md-elevation>
								${rows.map((row, ri) => {
									return cols.map((col, ci) => {
										const coord = `${col}${row}`;
										const isLight = (ri + ci) % 2 === 0;
										const classes = classMap({
											square: true,
											light: isLight,
											dark: !isLight,
										});
										return html`<div
											class="${classes}"
											@click=${() => {
												if (!appstate.userAnswer) {
													appstate.userAnswer = coord;
													if (!appstate.audioFeedback) {
														return;
													}
													if (appstate.userAnswer === appstate.coordQuestion) {
														SUCCESS_AUDIO.play();
														statsCtrl.addSuccess(coord);
													} else {
														WRONG_AUDIO.play();
														statsCtrl.addFailure(coord);
													}
												}
											}}
										>
											<div class="coordinate">
												${appstate.showCoords ? coord : null}
												${appstate.userAnswer
													? html`
															${coord === appstate.userAnswer &&
															appstate.userAnswer !== appstate.coordQuestion
																? html`❌`
																: null}
															${coord === appstate.coordQuestion
																? html`✅`
																: null}
														`
													: null}
											</div>
										</div>`;
									});
								})}
							`}
				</div>
				<footer>${this.#renderGameButton()}</footer>
			</div>
		`;
	}

	#renderGameButton() {
		const buttonType = appstate.userAnswer
			? literal`md-elevated-button`
			: literal`md-filled-button`;
		return staticHtml`
      <${buttonType}
        style="width:100%"
        ?trailing-icon=${appstate.userAnswer}
        ?inert="${!appstate.userAnswer}"
        @click=${() => {
					appstate.pickNewCoordinate();
				}}
      >
        ${
					appstate.userAnswer
						? staticHtml` <md-icon slot="icon">arrow_forward</md-icon>

								New question`
						: staticHtml`
								<md-icon slot="icon">not_listed_location</md-icon>
								Can you find ${appstate.coordQuestion} ?
							`
				}
      </${buttonType}>
    `;
	}

	selectSquare(file: File, rank: Rank) {
		this.selectedSquare = `${file}${rank}`;
	}
}

export const app = (window.app = new AppShell());
