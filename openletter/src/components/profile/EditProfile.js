import React from 'react';
import { Modal, Button, DropdownButton, MenuItem, ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import '../../fontawesome-all';
import './EditProfile.css';


export default function EditProfile(props){
    return(
        <div className="static-modal">
            <Modal show={props.show}>
                <Modal.Header>
                    <Modal.Title>Edit Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Add A Profile Picture <i className="fas fa-camera fa-sm"></i> </div>
                    <div className="birthday">
                        <ButtonToolbar>
                            <DropdownButton bsSize="small" title={ props.month || "Month"} id="month" onSelect={(val) => props.handleSelect('month', val)}>
                                <MenuItem eventKey='January'>January</MenuItem>
                                <MenuItem eventKey='February'>February</MenuItem>
                                <MenuItem eventKey='March'>March</MenuItem>
                                <MenuItem eventKey='April'>April</MenuItem>
                                <MenuItem eventKey='May'>May</MenuItem>
                                <MenuItem eventKey='June'>June</MenuItem>
                                <MenuItem eventKey='July'>July</MenuItem>
                                <MenuItem eventKey='August'>August</MenuItem>
                                <MenuItem eventKey='September'>September</MenuItem>
                                <MenuItem eventKey='October'>October</MenuItem>
                                <MenuItem eventKey='November'>November</MenuItem>
                                <MenuItem eventKey='December'>December</MenuItem>
                            </DropdownButton>
                            <DropdownButton bsSize="small" title={ props.day || "Day" } id="day" onSelect={(val) => props.handleSelect('day', val)}>
                                <MenuItem eventKey='1'>1</MenuItem>
                                <MenuItem eventKey='2'>2</MenuItem>
                                <MenuItem eventKey='3'>3</MenuItem>
                                <MenuItem eventKey='4'>4</MenuItem>
                                <MenuItem eventKey='5'>5</MenuItem>
                                <MenuItem eventKey='6'>6</MenuItem>
                                <MenuItem eventKey='7'>7</MenuItem>
                                <MenuItem eventKey='8'>8</MenuItem>
                                <MenuItem eventKey='9'>9</MenuItem>
                                <MenuItem eventKey='10'>10</MenuItem>
                                <MenuItem eventKey='11'>11</MenuItem>
                                <MenuItem eventKey='12'>12</MenuItem>
                                <MenuItem eventKey='13'>13</MenuItem>
                                <MenuItem eventKey='14'>14</MenuItem>
                                <MenuItem eventKey='15'>15</MenuItem>
                                <MenuItem eventKey='16'>16</MenuItem>
                                <MenuItem eventKey='17'>17</MenuItem>
                                <MenuItem eventKey='18'>18</MenuItem>
                                <MenuItem eventKey='19'>19</MenuItem>
                                <MenuItem eventKey='20'>20</MenuItem>
                                <MenuItem eventKey='21'>21</MenuItem>
                                <MenuItem eventKey='22'>22</MenuItem>
                                <MenuItem eventKey='23'>23</MenuItem>
                                <MenuItem eventKey='24'>24</MenuItem>
                                <MenuItem eventKey='25'>25</MenuItem>
                                <MenuItem eventKey='26'>26</MenuItem>
                                <MenuItem eventKey='27'>27</MenuItem>
                                <MenuItem eventKey='28'>28</MenuItem>
                                <MenuItem eventKey='29'>29</MenuItem>
                                <MenuItem eventKey='30'>30</MenuItem>
                                <MenuItem eventKey='31'>31</MenuItem>
                            </DropdownButton>
                            <FormGroup >
                                <FormControl bsSize="small" type="text" value={props.year} placeholder="Enter 4 digit Year ex: 1986" onChange={(e) => props.handleChange('year', e.target.value)} />
                            </FormGroup>
                        </ButtonToolbar>
                        <div>
                            Add A Summary About You
                            <input className="about-input" type="text"  value={props.about} onChange={(e) => props.handleChange('about', e.target.value)}/>
                        </div>
                        <div>
                            Add Your Job Title 
                            <input className="job-input" type="text"  value={props.job} onChange={(e) => props.handleChange('job', e.target.value)}/>                            
                        </div>
                        <div>
                            Add Your Employer 
                            <input className="employer-input" type="text"  value={props.employer} onChange={(e) => props.handleChange('employer', e.target.value)}/>                            
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.handleSubmit}>Save</Button>
                    <Button bsStyle="danger" onClick={props.handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}