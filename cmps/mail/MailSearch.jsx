
export class MailSearch extends React.Component {
    state = {
        SearchBy: ''
    }
    handleChange = ({target}) => {
        const value = target.value;
        this.setState({ SearchBy: value })
    };

    onSearch = (ev) => {
        ev.preventDefault();
        this.props.onSetSearch(this.state.SearchBy)
    };

    render() {
        return (
            <form className="mail-search" onChange={this.onSearch}>
                <label htmlFor='username'><h3></h3></label>
                    <input
                        name='username'
                        id='username'
                        type='text'
                        placeholder='username'
                        onChange={this.handleChange}
                    />
                
            </form>
        )
    }



}
