import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './css_files/footer_css.css';

class FooterPage extends Component {
  render() {
    return (
      <div className='footer'>
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
          <MDBContainer fluid className="text-center text-md-left">
            <MDBRow>
              <MDBCol md="6">
                <h6>
                  <p>
                    At Query Web , we try to commuicate you with people around the world so you can solve or ask any queries that you have in your mind.<br></br>
                  It's a platform where you can share your knowledge about different topics !!
                </p>
                </h6>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="container-fluid text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()}  Copyright: Query Web
        </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    );
  }
}

export default FooterPage;