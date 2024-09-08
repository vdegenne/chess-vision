import {ReactiveController} from '@snar/lit';
import {PropertyValues} from 'lit';
import {ColorMode, ThemeManager} from 'lit-with-styles';
import {state} from 'snar';
import {saveToLocalStorage} from 'snar-save-to-local-storage';

@saveToLocalStorage('sfc:theme')
export class ThemeStore extends ReactiveController {
	@state() colorMode = ColorMode.SYSTEM;
	/**
	 * When changing the following default value, we also have
	 * to make sure to provide the tokens on start,
	 * and also 'theme-color' meta tag in html header.
	 * Material default theme seed is '#6750A4'
	 */
	@state() themeColor = '#00FF1E';

	async updated(changed: PropertyValues) {
		if (changed.has('colorMode')) {
			ThemeManager.mode = this.colorMode;
		}
		const {themeFromSourceColor, applyTheme} = await import(
			'@vdegenne/material-color-helpers'
		);
		const theme = themeFromSourceColor(
			this.themeColor,
			ThemeManager.appliedColorScheme === 'dark',
			'vibrant',
			0,
		);
		applyTheme(document, theme!);
	}

	get appliedColorScheme() {
		return ThemeManager.appliedColorScheme;
	}

	toggleMode() {
		const currentScheme = ThemeManager.appliedColorScheme!;
		const oppositeMode =
			currentScheme === 'dark' ? ColorMode.LIGHT : ColorMode.DARK;
		this.colorMode = oppositeMode;
	}
}

export const themeStore = (window.themeStore = new ThemeStore());

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', () => themeStore.requestUpdate());

declare global {
	interface Window {
		themeStore: ThemeStore;
	}
}

ThemeManager.init();
