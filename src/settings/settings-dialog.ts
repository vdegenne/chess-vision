import type {MdDialog, MdFilterChip} from '@material/web/all.js';
import {customElement} from 'custom-element-decorator';
import {html, LitElement} from 'lit';
import {withStyles} from 'lit-with-styles';
import {query, state} from 'lit/decorators.js';
import {appstate, COLUMNS, ROWS} from '../app-shell/app-shell.js';
import {SVG_GITHUB} from '../assets/assets.js';
import {themeStore} from '../styles/styles.js';
import {renderThemeElements} from '../styles/theme-elements.js';
import styles from './settings-dialog.css?inline';

@customElement({name: 'settings-dialog', inject: true})
@withStyles(styles)
class SettingsDialog extends LitElement {
	@state() open = false;

	@query('md-dialog') dialog!: MdDialog;

	firstUpdated() {
		themeStore.bind(this);
		appstate.bind(this);
	}

	render() {
		return html`
			<md-dialog ?open=${this.open} @close=${() => (this.open = false)}>
				<header slot="headline">
					<md-icon>settings</md-icon>
					Settings
				</header>

				<form slot="content" method="dialog" id="form">
					<h3>Theme</h3>
					${renderThemeElements()}

					<h3>Board</h3>

					<h4>Files to include</h4>
					<md-chip-set>
						${COLUMNS.map((f) => {
							return html`
								<md-filter-chip
									elevated
									?selected=${appstate.filesToInclude.includes(f)}
									@click=${(event: MouseEvent) => {
										const target = event.target as MdFilterChip;
										event.preventDefault();
										if (target.selected) {
											appstate.addFile(f);
										} else {
											if (appstate.filesToInclude.length === 1) {
												// Can't deselect all
												return;
											}
											appstate.removeFile(f);
										}
									}}
									>${f}</md-filter-chip
								>
							`;
						})}
					</md-chip-set>

					<h4>Ranks to include</h4>
					<md-chip-set>
						${ROWS.map((r) => {
							return html`
								<md-filter-chip
									elevated
									?selected=${appstate.ranksToInclude.includes(r)}
									@click=${(event: MouseEvent) => {
										const target = event.target as MdFilterChip;
										event.preventDefault();
										if (target.selected) {
											appstate.addRank(r);
										} else {
											if (appstate.ranksToInclude.length === 1) {
												// Can't deselect all
												return;
											}
											appstate.removeRank(r);
										}
									}}
									>${r}</md-filter-chip
								>
							`;
						})}
					</md-chip-set>

					<h3>Audio</h3>
					<md-list style="padding: 0">
						<md-list-item @click=${() => appstate.toggleSpeech()} type="button">
							<md-switch
								slot="end"
								inert
								?selected=${appstate.speechEnabled}
								icons
							></md-switch>
							<div slot="headline">Speech</div>
							<div slot="supporting-text">
								Speak coordinates on new question
							</div>
						</md-list-item>
						<md-list-item
							@click=${() => appstate.toggleAudioFeedback()}
							type="button"
						>
							<md-switch
								slot="end"
								inert
								?selected=${appstate.audioFeedback}
								icons
							></md-switch>
							<div slot="headline">Feedback</div>
							<div slot="supporting-text">
								Emit a sound on good or wrong answers
							</div>
						</md-list-item>
					</md-list>
				</form>

				<div slot="actions">
					<md-outlined-button
						href="https://github.com/vdegenne/chess-vision"
						target="_blank"
					>
						<md-icon slot="icon">${SVG_GITHUB}</md-icon>
						Sources
					</md-outlined-button>
					<div style="flex:1"></div>
					<md-text-button form="form">Close</md-text-button>
				</div>
			</md-dialog>
		`;
	}

	async show() {
		if (this.dialog.open) {
			const dialogClose = new Promise((resolve) => {
				const resolveCB = () => {
					resolve(null);
					this.dialog.removeEventListener('closed', resolveCB);
				};
				this.dialog.addEventListener('closed', resolveCB);
			});
			this.dialog.close();
			await dialogClose;
		}
		this.open = true;
	}

	close(returnValue?: string) {
		return this.dialog.close(returnValue);
	}
}

declare global {
	interface Window {
		settingsDialog: SettingsDialog;
	}
	interface HTMLElementTagNameMap {
		'settings-dialog': SettingsDialog;
	}
}

export const settingsDialog = (window.settingsDialog = new SettingsDialog());
