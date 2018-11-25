import React, {Component} from 'react';
import { Text } from 'react-native';
import { Button,Card,CardSection,Input,Spinner } from './common';

class LoginForm extends Component {

	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: '',
			error:'',
			loading: false,
			loggedin: null
		};

		onLoginSuccess = this.onLoginSuccess.bind(this);
		onLoginFail = this.onLoginFail.bind(this);
		onLoginPress = this.onLoginPress.bind(this);
		onLogoutPress = this.onLogoutPress.bind(this);
	}

	onLoginPress(){
		const { email,password } = this.state;

		this.setState({error: '', loading: true})

		if(email === 'test@test.com' && password === 'test123'){
			onLoginSuccess();
			this.setState({loggedin: true});
		}else{
			onLoginFail();
		}
	}

	onLogoutPress(){
		this.state.loggedin = false;
	}

	onLoginSuccess(){
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: ''
		});
	}

	onLoginFail(){
		this.setState({
			error: 'Authentication Failed!!!',
			loading: false
		});
	}

	renderButton(){
		if(this.state.loading){
			return <Spinner size="small" />;
		}
		return (
			<Button onPress={this.onLoginPress.bind(this)}>
      			Log in
      		</Button>
      	);
	}

	renderContent(){
		if(this.state.loggedin){
			return (
				<Button onPress={this.onLogoutPress.bind(this)}>
	      			Log out
	      		</Button>
	      	);
		}
	}


  render() {
    return (
      <Card>
      	<CardSection>
      		<Input
      			label="Email"
      			placeholder="user@mail.com"
      			value={this.state.email}
      			onChangeText={email => this.setState({email})}
       		/>
      	</CardSection>
      	<CardSection>
      		<Input
      			secureTextEntry
      			label="Password"
      			placeholder="p@$$word"
      			value={this.state.password}
      			onChangeText={password => this.setState({password})}
       		/>
      	</CardSection>

      	<Text style={styles.errorTextStyle}>
      		{this.state.error}
      	</Text>

      	<CardSection>
      		{this.renderButton()}
					{this.renderContent()}
      	</CardSection>

      </Card>
    );
  }
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;
