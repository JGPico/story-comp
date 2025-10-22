import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import './ContactForm.css'

export interface ContactFormData {
  name: string
  address: string
  email: string
  phone: string
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
}

 function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    address: '',
    email: '',
    phone: ''
  })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    } else {
      // Default behavior if no handler supplied
      console.log('Submitted contact form:', formData)
      alert('Form submitted! Check console for details.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="contact-form">
        <label>
          <div>Name</div>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="William Stryker"
            required
          />
        </label>

        <label>
          <div>Address</div>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Hometown, USA"
            rows={3}
            required
          />
        </label>

        <label>
          <div>Email address</div>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="willy@example.com"
            required
          />
        </label>

        <label>
          <div>Phone number</div>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            pattern="[+()\-\s\d]{7,}"
            title="Please enter a valid phone number"
            required
          />
        </label>

        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default ContactForm;


