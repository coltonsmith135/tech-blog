const newFormHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#project-name').value
    const description = document.querySelector('#project-desc').value



    if( title && description ) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if(response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to create post')
        }
    }
}

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        })

        if(response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to delete post')
        }
    }
}

document
  .querySelector('.new-post-form')
  .addEventListener('click', newFormHandler)

document
  .querySelector('.posts-list') 
  .addEventListener('click', delButtonHandler) 