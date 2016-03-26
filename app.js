var combineReducers = Redux.combineReducers;
var createStore = Redux.createStore;
var formReducer = ReduxForm.reducer;
var Provider  = ReactRedux.Provider;

var reducers = {
    form: formReducer
};

var reducer = combineReducers(reducers);
var store = createStore(reducer);

var submit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject({email: 'Email exists', _error: 'Sign up failed!'});
        }, 1000);
    });
};

var SignUpForm = React.createClass({
    render() {
        const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(submit)}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="First Name" {...firstName}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="Last Name" {...lastName}/>
                </div>
                <div className={'form-group' + (email.touched && email.error ? ' has-danger' : '')}>
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" {...email}/>
                    <span className="text-help">
                        {email.error}
                    </span>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
});

var SignUpFormContainer = ReduxForm.reduxForm({
    form: 'signUpForm',
    fields: ['firstName', 'lastName', 'email']
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