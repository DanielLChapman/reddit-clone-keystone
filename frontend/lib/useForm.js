import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // this function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value, 10);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    if (type === 'error') {
      setInputs({
        ...inputs,
        errors: {
          [name]: value,
        }
      })
    } else {
      
      setInputs({
        // copy existing state
        ...inputs,
        [name]: value,
      });
    }
    
  }



  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );

    setInputs(blankState);
  }

  // return what we want to surface from custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
