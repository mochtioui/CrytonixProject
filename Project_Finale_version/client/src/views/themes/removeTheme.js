
import React from "react";
import serviceTheme from "../../services/theme.service";
import { Link} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";


class RemoveTheme extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        theme: props.theme,
        exist: 0
    }
  }

  componentDidMount() {
      serviceTheme.checkUsedTheme(this.state.theme._id)
          .then( res => {
              console.log(res)
                  this.setState({
                      exist: res.exist
                  })
          }

          )
  }

  removeClick = () => {
      serviceTheme.deleteTheme(this.state.theme._id)
          .then(() =>
              this.props.hanlde()
          )
  }

  handleClose = () => {
      this.props.close()
  }

  render() {

      const { show } = this.props

      return (
          <Modal show= {show}
                 size="md"
                 centered
                 onHide={ this.handleClose }
          >
              <Modal.Header closeButton>
                  <Modal.Title>Confirm</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  { this.state.exist ? 'This theme is already used in a website' : 'You are sure you want remove this theme' }
              </Modal.Body>
              <Modal.Footer>
                  {
                      this.state.exist ?
                          <Button variant="info" onClick={ this.handleClose }>Ok</Button>
                          :
                          <>
                              <Button variant="secondary" onClick={ this.handleClose }>
                                  Close
                              </Button>
                              <Button variant="info" onClick={ this.removeClick }>
                                  Remove
                              </Button>
                          </>
                  }

              </Modal.Footer>
          </Modal>
    );
  }
}

export default RemoveTheme;
