---
to: "app/components/<%= type %>/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.tsx"
---
import styles from './<%= h.changeCase.paramCase(name) %>.module.css';

export type T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %> = React.PropsWithChildren;

export const <%= h.inflection.camelize(h.changeCase.camelCase(name)) %>: React.FC<T<%= h.inflection.camelize(h.changeCase.camelCase(name)) %>> = ({ ...rest }) => {
	return (
		<div
			className={styles.base}
			data-e2e-id="<%= h.changeCase.paramCase(name) %>"
			{...rest}
		>
			Component
		</div>
	)
}
