const localStorageKey = '__auth_provider_token__'

interface User {
  user: {
    token: string
  }
}
export interface LoginParams {
  username: string
  password: string
}
async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({ user }: User) {
  window.localStorage.setItem(localStorageKey, user.token)
  return user
}

function login({ username, password }: LoginParams) {
  return client('login', { username, password }).then(handleUserResponse) as Promise<User>
}

function register({ username, password }: LoginParams) {
  return client('register', { username, password }).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

const authURL = process.env.REACT_APP_AUTH_URL ?? '/api'

async function client(endpoint: string, data: any) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { getToken, login, register, logout, localStorageKey }
