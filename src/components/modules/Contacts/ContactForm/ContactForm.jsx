import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './contact-form.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };
  reset() {
    this.setState({
      name: '',
      number: '',
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <form action="" onSubmit={handleSubmit}>
        <div className={css.block}>
          <label className={css.label} htmlFor="">
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            className={css.input}
            placeholder="Name and surname"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. 
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={css.block}>
          <label className={css.label} htmlFor="">
            Number
          </label>
          <input
            onChange={handleChange}
            value={number}
            className={css.input}
            placeholder="Number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, 
          parentheses and can start with +"
            required
          />
        </div>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
