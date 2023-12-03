import { FloatingLabel, Form } from "react-bootstrap";

interface FilterSelectProps {
	label: string;
	options: Option[];
}

interface Option {
	title: string;
	value: any;
}

function FilterSelect(props: FilterSelectProps) {
	return (
		<FloatingLabel label={props.label}>
			<Form.Select style={{ minWidth: 150 }}>
				<option>Any</option>
				{props.options.map(option => {
					return <option value={option.value}>{option.title}</option>;
				})}
			</Form.Select>
		</FloatingLabel>
	);
}

export default FilterSelect;
