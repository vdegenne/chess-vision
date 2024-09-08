import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

export type Stats = {
	[square: string]: {
		success: number;
		failure: number;
	};
};

@saveToLocalStorage('chess-vision:stats')
class StatsController extends ReactiveController {
	@state() private _stats: Stats = {};

	addSuccess(square: string) {
		if (square in this._stats) {
			this._stats[square].success++;
		} else {
			this._stats[square] = {
				success: 1,
				failure: 0,
			};
		}
		this.requestUpdate();
	}

	addFailure(square: string) {
		if (square in this._stats) {
			this._stats[square].failure++;
		} else {
			this._stats[square] = {
				success: 0,
				failure: 1,
			};
		}
		this.requestUpdate();
	}

	get statsMap() {
		return Object.keys(this._stats).map((square) => {
			const obj = this._stats[square];
			return {square, failure: obj.failure, success: obj.success};
		});
	}

	get sortedFailures() {
		return this.statsMap.sort((o1, o2) => o2.failure - o1.failure);
	}
	get sortedSuccess() {
		return this.statsMap.sort((o1, o2) => o2.success - o1.success);
	}
}

export const statsCtrl = new StatsController();
