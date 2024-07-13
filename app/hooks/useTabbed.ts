import { useRef, useState } from 'react';

type TOrientation = 'horizontal' | 'vertical';

export type TUseTabbed = {
	activeTab: number;
	tabItemRefs: React.MutableRefObject<{ [key: number]: HTMLElement | null }>;
	tabPanelRefs: React.MutableRefObject<{ [key: number]: HTMLElement | null }>;
	handleTabClick: (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		index: number,
	) => void;
	handleTabKeyDown: (
		e: React.KeyboardEvent<HTMLAnchorElement>,
		orientation: 'horizontal' | 'vertical',
	) => void;
};

export const useTabbed = (): TUseTabbed => {
	const [activeTab, setActiveTab] = useState(0);
	const tabItemRefs = useRef<{ [key: number]: HTMLElement | null }>({});
	const tabPanelRefs = useRef<{ [key: number]: HTMLElement | null }>({});

	const handleTabClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		index: number,
	): void => {
		e.preventDefault();

		setActiveTab(index);
	};

	const getNextIndex = (
		direction: string,
		orientation: TOrientation,
		activeTab: number,
	): number => {
		const isVertical = orientation === 'vertical';
		const next = isVertical ? 'ArrowDown' : 'ArrowRight';
		const previous = isVertical ? 'ArrowUp' : 'ArrowLeft';

		switch (direction) {
			case next:
				return activeTab + 1;
			case previous:
				return activeTab - 1;
			default:
				return activeTab;
		}
	};

	const setNextActiveTab = (
		direction: string,
		orientation: TOrientation,
	): void => {
		const tabRefs = tabItemRefs.current;
		const newIndex = getNextIndex(direction, orientation, activeTab);

		if (tabRefs[newIndex] !== undefined) {
			setActiveTab(newIndex);
			tabItemRefs.current[newIndex]?.focus();
		}
	};

	const handleTabKeyDown = (
		e: React.KeyboardEvent<HTMLAnchorElement>,
		orientation: TOrientation,
	): void => {
		const isVertical = orientation === 'vertical';
		const next = isVertical ? 'ArrowDown' : 'ArrowRight';
		const previous = isVertical ? 'ArrowUp' : 'ArrowLeft';
		const toPanel = isVertical ? 'ArrowRight' : 'ArrowDown';

		if (e.key === toPanel) {
			e.preventDefault();
			tabPanelRefs.current[activeTab]?.focus();
		}

		if (e.key === next || e.key === previous) {
			e.preventDefault();
			setNextActiveTab(e.key, orientation);
		}
	};

	return {
		activeTab,
		tabItemRefs,
		tabPanelRefs,
		handleTabClick,
		handleTabKeyDown,
	};
};
