import styles from '../tabbed.module.css';

export type TPanel = {
	id: string;
	index: number;
	activeTab: number;
	children: React.ReactNode;
	panelRef: React.MutableRefObject<{ [key: number]: HTMLElement | null }>;
};

export const Panel: React.FC<TPanel> = ({
	id,
	index,
	activeTab,
	panelRef,
	children,
}) => (
	<section
		id={`panel-${id}`}
		role="tabpanel"
		aria-labelledby={`tab-${id}`}
		hidden={activeTab !== index}
		ref={(element) => (panelRef.current[index] = element)}
		tabIndex={-1}
		className={styles.panel}
	>
		{children}
	</section>
);
