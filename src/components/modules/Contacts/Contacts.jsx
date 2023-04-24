import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import css from './contacts.module.css';

class Contacts extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
    return Notify.info(`The contact has been removed from the contact list!`);
  };

  addContact = event => {
    event.preventDefault();
    const { name } = this.state;
    if (this.isDublicate(name)) {
      return Notify.warning(`${name} is already in contact list!`);
    }
    this.setState(prevState => {
      const { name, number, contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [newContact, ...contacts],
        name: '',
        number: '',
      };
    });
    return Notify.success(`${name} is added to contact list!`);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isDublicate(name) {
    const normilizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normilizedName;
    });
    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normilizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normilizedFilter) ||
        number.includes(normilizedFilter)
      );
    });
    return result;
  }

  render() {
    const { addContact, handleChange, removeContact } = this;
    const { name, number } = this.state;
    const contacts = this.getFilteredContacts();

    return (
      <>
        <div className={css.section}>
          <div className={css.wrapper}>
            <h2 className={css.title}>Phonebook</h2>
            <form action="" onSubmit={addContact}>
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
          </div>
          <div className={css.wrapper}>
            <h2 className={css.title}>Contacts</h2>
            <div className={css.block}>
              <ContactFilter
                handleChange={handleChange}
              />
              <ContactList removeContact={removeContact} contacts={contacts} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Contacts;
