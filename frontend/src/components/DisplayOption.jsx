import { Dropdown } from 'react-bootstrap/';

const DisplayOption = ({ variant, type, options, cls, value, setHandler }) => {

    return (
        <>
            <Dropdown className='col-md-3' >
                <Dropdown.Toggle variant={variant} id="dropdown-basic" className={cls}>
                    <span className="">{type}:</span>
                    {value}
                </Dropdown.Toggle>

                <Dropdown.Menu onClick={(e) => { setHandler(e.target.text) }}>
                    {options.map((opt, key) => <Dropdown.Item key={key}>{opt}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>

        </>

    )
}

export default DisplayOption;