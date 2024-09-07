import '@material/web/button/filled-button.js';
import '@material/web/button/filled-tonal-button.js';
import {ReactiveController, state} from '@snar/lit';
import {LitElement} from 'lit';
import {ColorMode, withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {html, literal} from 'lit/static-html.js';
import {materialShellLoadingOff} from 'material-shell';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {SUCCESS_AUDIO, WRONG_AUDIO} from '../assets/assets.js';
import {type ThemeStore} from '../styles/styles.js';
import styles from './app-shell.css?inline';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

const ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
const COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

@saveToLocalStorage('chess-vision:state')
class AppState extends ReactiveController {
	@state() flipped = false;
	@state() showCoords = false;
	@state() coordQuestion = '';
	@state() userAnswer = '';

	pickNewCoordinate() {
		this.userAnswer = '';
		this.coordQuestion = `${COLUMNS[Math.floor(Math.random() * 8)]}${ROWS[Math.floor(Math.random() * 8)]}`;
	}
}
const appstate = new AppState();

@customElement('app-shell')
@withStyles(styles)
export class AppShell extends LitElement {
	@state() themeStore: ThemeStore | undefined = undefined;

	constructor() {
		super();
		appstate.bind(this);
		appstate.updateComplete.then(async () => {
			if (!appstate.coordQuestion) {
				appstate.pickNewCoordinate();
			}
		});
		import('../styles/styles.js').then(({themeStore}) => {
			this.themeStore = themeStore;
			themeStore.bind(this);
		});

		document.addEventListener('keydown', (event: KeyboardEvent) => {
			if (event.key === ' ') {
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

		const buttonType = appstate.userAnswer
			? literal`md-filled-button`
			: literal`md-filled-tonal-button`;

		return html`
			<div id="main-container">
				<header>
					<${buttonType}
						?trailing-icon=${appstate.userAnswer}
						?inert="${!appstate.userAnswer}"
						@click=${() => {
							appstate.pickNewCoordinate();
						}}
					>
						${
							appstate.userAnswer
								? html` <md-icon slot="icon">arrow_forward</md-icon>

										New question`
								: html` <md-icon slot="icon">not_listed_location</md-icon>
										Find ${appstate.coordQuestion}`
						}
					</${buttonType}>
					<div style="flex:1"></div>
					<md-icon-button
						@click=${() => (appstate.showCoords = !appstate.showCoords)}
					>
						${
							appstate.showCoords
								? html`<md-icon>visibility</md-icon>`
								: html`<md-icon>visibility_off</md-icon>`
						}
					</md-icon-button>
					<md-icon-button @click="${() => this.themeStore?.toggleMode()}">
						${
							this.themeStore?.colorMode === ColorMode.DARK
								? html`<md-icon>dark_mode</md-icon>`
								: html`<md-icon>light_mode</md-icon>`
						}
					</md-icon-button>
					<md-icon-button
						@click=${() => (appstate.flipped = !appstate.flipped)}
					>
						<md-icon>wifi_protected_setup</md-icon>
					</md-icon-button>
				</header>
				<div id="board">
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
										if (appstate.userAnswer === appstate.coordQuestion) {
											SUCCESS_AUDIO.play();
										} else {
											WRONG_AUDIO.play();
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
												${coord === appstate.coordQuestion ? html`✅` : null}
											`
										: null}
								</div>
							</div>`;
						});
					})}
				</div>
				<div
					style="color:var(--md-sys-color-outline-variant);font-size:90%;padding:8px;"
				>
					(shortcuts: ${'<space>'} new question)
				</div>
			</div>
		`;
	}
}

export const app = (window.app = new AppShell());
