var combineReducers = Redux.combineReducers;
var createStore = Redux.createStore;
var formReducer = ReduxForm.reducer;
var Provider  = ReactRedux.Provider;

var reducers = {
    form: formReducer
};

var reducer = combineReducers(reducers);
var store = createStore(reducer);

var onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({email: 'Email exists', _error: 'Sign up failed!'});
        }, 1000);
    });
};

var validate = values => {
    var errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

var SignUpForm = React.createClass({
    render() {
        const {fields: {firstName, lastName, email}, handleSubmit, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'form-group' + (firstName.touched && firstName.error ? ' has-danger' : '')}>
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First Name" {...firstName}/>
                    {firstName.touched && firstName.error && <span className="text-help">{firstName.error}</span>}
                </div>
                <div className={'form-group' + (lastName.touched && lastName.error ? ' has-danger' : '')}>
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name" {...lastName}/>
                    {lastName.touched && lastName.error && <span className="text-help">{lastName.error}</span>}
                </div>
                <div className={'form-group' + (email.touched && email.error ? ' has-danger' : '')}>
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" {...email}/>
                    {email.touched && email.error && <span className="text-help">{email.error}</span>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>Sign up</button>
            </form>
        );
    }
});

var SignUpFormContainer = ReduxForm.reduxForm({
    form: 'signUpForm',
    fields: ['firstName', 'lastName', 'email'],
    validate
})(SignUpForm);

var App = React.createClass({
    render() {
        return (
            <div className="container">
                <SignUpFormContainer/>
            </div>
        )
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
);