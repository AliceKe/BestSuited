import { useState } from "react";
import { Dropdown } from 'react-bootstrap/';

const DisplayOption = ({ variant, type, options, cls, setHandler }) => {
    const [value, setValue] = useState(options[0])

    return (
        <>
            <Dropdown >
                <Dropdown.Toggle variant={variant} id="dropdown-basic" className={cls}>
                    <span className="me-3">{type}:</span>
                    {value}
                </Dropdown.Toggle>

                <Dropdown.Menu onClick={(e) => { setValue(e.target.text); setHandler(value) }}>
                    {options.map((opt) => <Dropdown.Item>{opt}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>

        </>

    )
}

export default DisplayOption;