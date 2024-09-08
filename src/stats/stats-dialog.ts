import type {MdDialog} from '@material/web/all.js';
import {customElement} from 'custom-element-decorator';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {state, query} from 'lit/decorators.js';
import styles from './stats-dialog.css?inline';
import {statsCtrl} from './statsCtrl.js';

@customElement({name: 'stats-dialog', inject: true})
@withStyles(styles)
class StatsDialog extends LitElement {
	@state() open = false;

	@query('md-dialog') dialog!: MdDialog;

	firstUpdated() {
		statsCtrl.bind(this);
	}

	render() {
		const successes = statsCtrl.sortedSuccess;
		const failures = statsCtrl.sortedFailures;

		const successCount = statsCtrl.statsMap.reduce(
			(acc, curr) => (acc += curr.success),
			0,
		);
		const failureCount = statsCtrl.statsMap.reduce(
			(acc, curr) => (acc += curr.failure),
			0,
		);

		const successRate = successCount / (successCount + failureCount);
		const failureRate = failureCount / (successCount + failureCount);

		return html`
			<md-dialog ?open=${this.open} @close=${() => (this.open = false)}>
				<header slot="headline">Stats</header>

				<form slot="content" method="dialog" id="form">
					<div style="margin-bottom:24px;">
						<b>Game played: </b>${successCount + failureCount}
					</div>
					<div><b>Success rate: </b>${successRate.toFixed(1)}</div>
					<success-failure-rate-linear-progress></success-failure-rate-linear-progress>
					<div style="text-align:end">
						<b>Failure rate: </b>${failureRate.toFixed(1)}
					</div>
					<div style="margin-top:24px;">
						<b>Most faileds: </b>${failures
							.slice(0, 4)
							.map((i) => i.square)
							.join(', ')}
					</div>
					<div style="">
						<b>Most succeededs: </b>${successes
							.slice(0, 4)
							.map((i) => i.square)
							.join(', ')}
					</div>
				</form>

				<div slot="actions">
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
		statsDialog: StatsDialog;
	}
	interface HTMLElementTagNameMap {
		'stats-dialog': StatsDialog;
	}
}

export const statsDialog = (window.statsDialog = new StatsDialog());
