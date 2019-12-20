# React-Native

`code usage`

# import TextInputField from "./TextInputField";`


# <TextInputField
#   returnKeyType={"next"}
#   activeColor='#ffffff'
#   inactiveColor='#465D65'
#   fontFamily='Roboto-Bold'
#   borderBottomColor='#465D65'
#   errorColor='#FF4001'
#   labelFontSize={12}
#   placeholderLabelFontSize={12}
#   placeholderLabel='FIRST NAME'
#   value={this.state.firstName}
#   ref={firstNameRef => {
#       this.firstNameRef = firstNameRef;
#   }}
#   refInner='firstNameRef'
#   onSubmitEditing={() => {
#       this.lastNameRef.refs.lastNameRef.focus();
#   }}
#   errorMessage={
#       this.state.field === 1
#           ? this.state.errorMessage
#           : ""
#   }
#   onChangeText={firstName => {
#       if (firstName.trim() === "") {
#           this.setState({
#               field: 1,
#               errorMessage:
#                   "Please enter first name"
#           });
#       } else {
#           this.setState({
#               field: 1,
#               errorMessage: ""
#           });
#       }
#       this.setState({ firstName: firstName });
#   }}
# />