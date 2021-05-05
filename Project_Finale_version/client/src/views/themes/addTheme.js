/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Detail Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import serviceTheme from "../../services/theme.service";
import { Link} from "react-router-dom";


class AddTheme extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        theme: props.theme,
        imagePreviewUrl: '',
        errors: '',
    }
  }

  handleChange = async (e) => {
     this.setState({
          theme: {
              ...this.state.theme,
              [e.target.name]: e.target.value.toLowerCase(),
          },
          errors: {
              ...this.state.errors,
              [e.target.name]: ''
          }
      })
  }



  handleImageChange = (e) => {

      e.preventDefault()

      let reader = new FileReader();
      let file = e.target.files[0];

      if (file) {

          if ( file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif' ) {
              reader.onloadend = () => {
                  this.setState({
                      theme: {
                          ...this.state.theme,
                          theme_img: file
                      },
                      imagePreviewUrl: reader.result,
                      errors: {
                          ...this.state.errors,
                          theme_img: ''
                      },
                  });
              }

              reader.readAsDataURL(file)
          }
          else {
              this.setState({
                  errors: {
                      ...this.state.errors,
                      theme_img: 'Image (Files allowed: png jpg jpeg)'
                  }
              })
          }
      }


  }

  saveTheme = async (e) => {

      e.preventDefault();

      const { theme } = this.state

       theme.theme_name === '' && this.setState({
          errors: {
              ...this.state.errors,
              theme_name: 'Name is required'
          }
      })

       theme.description === '' && this.setState({
          errors: {
              ...this.state.errors,
              description: 'Description is required'
          }
      })

       theme.theme_img === '' && this.setState({
          errors: {
              ...this.state.errors,
              theme_img: 'Image is required'
          }
      })

      if (theme.theme_name && theme.description && theme.theme_img) {

          let formData = new FormData();

          formData.set('theme_name', theme.theme_name);
          formData.set('description', theme.description);
          formData.append('file', theme.theme_img)


          if ( theme._id ) {

              formData.set('_id', theme._id);
              serviceTheme.editTheme(formData)

                  .then(res => {

                      if (res.message === 'exist' ) {
                          this.setState({
                              errors: {
                                  ...this.state.errors,
                                  theme_name: 'Name already exist'
                              }
                          })
                      } else {
                          this.setState({
                              theme: ''
                          })
                          this.props.handle(res)
                      }

                  })

          } else {

              serviceTheme.addTheme(formData)
                  .then(res => {

                      if (res.message === 'exist' ) {
                          this.setState({
                              errors: {
                                  ...this.state.errors,
                                  theme_name: 'Name already exist'
                              }
                          })
                      } else {
                          this.props.handle(res)
                      }

                  })
          }

      }

  }

  handleClose = () => {
      this.props.close()
  }



  render() {
      const { imagePreviewUrl, errors, theme } = this.state

      return (

        <div className="card">
          <div className="card-header">
              <h5 className="card-title">
                Add theme
              </h5>
          </div>
          <div className="card-body">
            <div className="form_theme">
                    <div className="form-group row">
                        <span className="label_form col-md-4">Name</span>
                        <div className="col-md-5 offset-md-1">
                      <input type="text" name="theme_name" className={ errors.theme_name ? 'form-control border-danger' : 'form-control'} onChange={ this.handleChange } defaultValue={ theme.theme_name } />
                        {
                            errors.theme_name &&
                            <span className="text-danger small"> { errors.theme_name } </span>
                        }
                    </div>
                    </div>
                    <div className="form-group row">
                        <span className="label_form col-md-4">Description</span>
                        <div className="col-md-5 offset-md-1">
                            <textarea className={ errors.description ? 'form-control border-danger' : 'form-control'} name="description" onChange={ this.handleChange } defaultValue={ theme.description } ></textarea>
                            {
                                errors.description &&
                                <span className="text-danger small"> { errors.description } </span>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="label_form col-md-4">Image</span>
                        <div className="col-md-5 offset-md-1">
                        <div className="input_file">
                            <input type="file" className="form-control" accept=".png, .jpg, .jpeg" onChange={ this.handleImageChange }/>
                            <div className="file_preview">
                                {
                                    imagePreviewUrl ?
                                        <img src={imagePreviewUrl} />
                                        :
                                        theme.theme_img ?
                                            <img src={ require('../../assets/img/theme/'+ theme.theme_img)} />
                                            :
                                            <p className="input_text">Drag your files here or click in this area</p>
                                }
                            </div>
                        </div>
                        {
                            errors.theme_img &&
                            <span className="text-danger small"> { errors.theme_img } </span>
                        }

                    </div>
                    </div>
                    <div className="col-auto offset-md-5">
                        <button className="btn btn-primary" onClick={ this.saveTheme }>Submit</button>
                    </div>
              <span className="btn_previous" onClick={ this.handleClose }>
                  <i className="nc-icon nc-minimal-left"></i>previous</span>
            </div>
          </div>
        </div>
    );
  }
}

export default AddTheme;
