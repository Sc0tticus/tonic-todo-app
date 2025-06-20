'use client';

import { useState, useEffect } from 'react';

export function useDarkMode() {
	const [darkMode, setDarkMode] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		// Check localStorage first, then system preference
		const savedDarkMode = localStorage.getItem('darkMode');
		let isDark = false;

		if (savedDarkMode !== null) {
			isDark = savedDarkMode === 'true';
		} else {
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		setDarkMode(isDark);

		// Apply the class immediately
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	const toggleDarkMode = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);

		// Save to localStorage
		localStorage.setItem('darkMode', newDarkMode.toString());

		// Apply the class
		if (newDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	// Return false during SSR to prevent hydration mismatch
	return {
		darkMode: mounted ? darkMode : false,
		toggleDarkMode,
		mounted
	};
}
