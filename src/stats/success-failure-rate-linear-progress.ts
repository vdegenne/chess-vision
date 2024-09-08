import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {statsCtrl} from './statsCtrl.js';

@customElement('success-failure-rate-linear-progress')
export class SuccessFailureRateLinearProgress extends LitElement {
	firstUpdated() {
		statsCtrl.bind(this);
	}
	static styles = css`
		:host {
			/*--md-linear-progress-active-indicator-color: var(--md-sys-color-tertiary);*/
			/* --md-linear-progress-track-color: var(--md-sys-color-error); */
		}
	`;

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

		if (isNaN(successRate)) {
		}

		return html`<md-linear-progress
			value=${isNaN(successRate) ? 0 : successRate}
		></md-linear-progress>`;
	}
}
