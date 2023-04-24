import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactForm from './ContactForm/ContactForm';
import contacts from './items';
import css from './contacts.module.css';

class Contacts extends Component {
  state = {
    contacts: [...contacts],
    filter: '',
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
    return Notify.info(`The contact has been removed from the contact list!`);
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name)) {
      return Notify.warning(`${name} is already in contact list!`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
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
  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
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
    const { addContact, handleFilter, removeContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <>
        <div className={css.section}>
          <div className={css.wrapper}>
            <h2 className={css.title}>Phonebook</h2>
            <ContactForm onSubmit={addContact} />
          </div>
          <div className={css.wrapper}>
            <h2 className={css.title}>Contacts</h2>
            <div className={css.block}>
              <ContactFilter handleChange={handleFilter} />
              <ContactList removeContact={removeContact} contacts={contacts} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Contacts;
