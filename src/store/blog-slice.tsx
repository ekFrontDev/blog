import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import validateForm from '../utils/index'

const initialState = {
  dataArticles: [],
  articlesCount: 0,
  searchId: '',
  status: null,
  error: null,
  isLoggedIn: false,
  openArticle: {},
  email: null,
  username: '',
  avatarImage: '',
  token: null,
  id: null,
  signUpForm: {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  },
  isValid: false,
  personaDataCheckbox: false,
  isRegistered: false,
  signInForm: {
    email: '',
    password: '',
  },
  editProfileForm: {
    username: '',
    email: '',
    password: '',
    image: '',
  },
  popUp: false,
  articleForm: {
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
  likes: false,
}

//Получение статей
export const getArticles = createAsyncThunk(
  'blog/GetArticles',

  async function (_, { rejectWithValue }) {
    const object = localStorage.getItem('token')
      ? {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      : null
    try {
      const res = await fetch(
        'https://blog-platform.kata.academy/api/articles?limit=5&offset=0',
        object,
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/articles?limit=5&offset=0, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

//Получение статей через пагинацию
export const GetTicketsPage = createAsyncThunk(
  'blog/GetTicketsPage',
  async function (pageNumber, { rejectWithValue }) {
    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles?limit=5&offset=${pageNumber * 5 - 5}`,
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/articles?limit=5&offset=${pageNumber * 5 - 5}, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const getArticle = createAsyncThunk(
  'blog/getArticle',
  async function (id, { rejectWithValue }) {
    const object = localStorage.getItem('token')
      ? {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      : null
    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${id}`,
        object,
      )
      if (!res.ok) {
        throw new Error(
          `https://blog-platform.kata.academy/api/articles/${id}, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const userRegistration = createAsyncThunk(
  'blog/userRegistration',
  async function (signUpForm, { rejectWithValue }) {
    const user = {
      user: signUpForm,
    }
    try {
      const res = await fetch('https://blog-platform.kata.academy/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/users, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(
        alert(
          'Такой пользователь уже существует, попробуйте изменить имя или адрес почты.',
        ),
      )
    }
  },
)

export const updateCurrentUser = createAsyncThunk(
  'blog/updateCurrentUser',
  async function (editProfileForm, { rejectWithValue }) {
    const user = {
      user: editProfileForm,
    }
    try {
      const res = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(user),
      })
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/user, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(
        alert(
          'Что-то пошло не так, попробуйте перезагрузить страницу и попробовать снова.',
        ),
      )
    }
  },
)

export const authorization = createAsyncThunk(
  'blog/authorization',
  async function (signInForm, { rejectWithValue }) {
    const user = {
      user: signInForm,
    }
    try {
      const res = await fetch(
        'https://blog-platform.kata.academy/api/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        },
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/users/login, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const checkToken = createAsyncThunk(
  'blog/checkToken',
  async function (_, { rejectWithValue }) {
    const tkn = localStorage.getItem('token')
    if (tkn) {
      try {
        const res = await fetch('https://blog-platform.kata.academy/api/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${tkn}`,
          },
        })
        if (!res.ok) {
          throw new Error(
            `Could not fetch https://blog-platform.kata.academy/api/user, received ${res.status}`,
          )
        }
        const data = await res.json()
        return data
      } catch (err) {
        return rejectWithValue(err.message)
      }
    }
  },
)

export const createArticle = createAsyncThunk(
  'blog/createArticle',
  async function (articleForm, { rejectWithValue }) {
    const tkn = localStorage.getItem('token')
    const article = {
      article: articleForm,
    }
    try {
      const res = await fetch(
        'https://blog-platform.kata.academy/api/articles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${tkn}`,
          },
          body: JSON.stringify(article),
        },
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/articles, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const likeStatusFavorited = createAsyncThunk(
  'blog/likeStatusFavorited',
  async function (id, { rejectWithValue }) {
    const tkn = localStorage.getItem('token')
    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${id}/favorite`,
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${tkn}`,
          },
        },
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/articles/${id}/favorite, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const likeStatusUnfavorited = createAsyncThunk(
  'blog/likeStatusUnfavorited',
  async function (id, { rejectWithValue }) {
    const tkn = localStorage.getItem('token')
    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${id}/favorite`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${tkn}`,
          },
        },
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/articles/${id}/favorite, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const deleteArticleItem = createAsyncThunk(
  'blog/deleteArticle',
  async function (id, { rejectWithValue }) {
    const tkn = localStorage.getItem('token')
    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${tkn}`,
          },
        },
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/articles/${id}, received ${res.status}`,
        )
      }
      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const editArticleItem = createAsyncThunk(
  'blog/editArticleItem',
  async function ({ id, editForm }, { rejectWithValue }) {
    const article = {
      article: {
        title: editForm.title,
        description: editForm.description,
        body: editForm.body,
      },
    }
    const tkn = localStorage.getItem('token')
    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${tkn}`,
          },
          body: JSON.stringify(article),
        },
      )
      if (!res.ok) {
        throw new Error(
          `Could not fetch https://blog-platform.kata.academy/api/articles/${id}, received ${res.status}`,
        )
      }
      const data = await res.json()
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    deleteOpenArticle: (state) => {
      state.openArticle = {}
    },
    setUser: (state, action) => {
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
    },
    removeUser: (state) => {
      state.email = null
      state.token = null
      state.id = null
    },
    updateFormData: (state, action) => {
      state.signUpForm = { ...state.signUpForm, ...action.payload }
      state.isValid = validateForm(state.signUpForm)
    },
    changePersonalDataCheckbox: (state) => {
      state.personaDataCheckbox = !state.personaDataCheckbox
    },
    updateSignInFormData: (state, action) => {
      state.signInForm = { ...state.signInForm, ...action.payload }
    },
    updateEditProfileFormData: (state, action) => {
      state.editProfileForm = { ...state.editProfileForm, ...action.payload }
    },
    createArticleForm: (state, action) => {
      state.articleForm = { ...state.articleForm, ...action.payload }
    },
    createArticleFormTags: (state, action) => {
      state.articleForm.tagList = [
        ...state.articleForm.tagList,
        ...action.payload,
      ]
    },
    logOutProfile: (state) => {
      state.isLoggedIn = false
      state.token = null
      state.email = null
      state.username = ''
      state.avatarImage = ''
      localStorage.removeItem('token')
    },
    showPopUp: (state) => {
      state.popUp = !state.popUp
    },
    changeLikesStatus: (state) => {
      state.likes = !state.likes
    },
    //весь функционал экшэнов
  },
  extraReducers: (builder) => {
    //getArticles
    builder.addCase(getArticles.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.articlesCount = action.payload?.articlesCount || 0
      state.dataArticles = action.payload?.articles || []
    })
    builder.addCase(getArticles.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch articles:', action.payload)
    })
    //GetTicketsPage
    builder.addCase(GetTicketsPage.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(GetTicketsPage.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.dataArticles = action.payload?.articles || []
    })
    builder.addCase(GetTicketsPage.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch articles:', action.payload)
    })
    //getArticle
    builder.addCase(getArticle.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.likes = action.payload?.article.favorited
      state.openArticle = action.payload?.article || {}
    })
    builder.addCase(getArticle.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch articles:', action.payload)
    })
    //userRegistration
    builder.addCase(userRegistration.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(userRegistration.fulfilled, (state) => {
      state.status = 'resolved'
      state.signUpForm = initialState.signUpForm
      state.isRegistered = true
    })
    builder.addCase(userRegistration.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch registration:', action.payload)
    })
    builder.addCase(authorization.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(authorization.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.username = action.payload?.user.username
      state.token = action.payload?.user.token
      state.email = action.payload?.user.email
      state.avatarImage = action.payload?.user.image
      localStorage.setItem('token', action.payload?.user.token)
      state.isLoggedIn = true
      state.signInForm = initialState.signInForm
    })
    builder.addCase(authorization.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch authorization:', action.payload)
    })
    builder.addCase(updateCurrentUser.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.username = action.payload?.user.username
      state.token = action.payload?.user.token
      state.email = action.payload?.user.email
      state.avatarImage = action.payload?.user.image
      state.isLoggedIn = true
      state.editProfileForm = initialState.editProfileForm
    })
    builder.addCase(updateCurrentUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch update current user:', action.payload)
    })
    builder.addCase(checkToken.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.username = action.payload?.user.username
      state.token = action.payload?.user.token
      state.email = action.payload?.user.email
      state.avatarImage = action.payload?.user.image
      state.isLoggedIn = true
    })
    builder.addCase(checkToken.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch check token:', action.payload)
    })
    //createArticle
    builder.addCase(createArticle.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(createArticle.fulfilled, (state) => {
      state.status = 'resolved'
      state.articleForm = initialState.articleForm
    })
    builder.addCase(createArticle.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch create article:', action.payload)
    })
    //likeStatusFavorited
    builder.addCase(likeStatusFavorited.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(likeStatusFavorited.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.likes = action.payload?.article.favorited
    })
    builder.addCase(likeStatusFavorited.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch create like:', action.payload)
    })
    //likeStatusUnfavorited
    builder.addCase(likeStatusUnfavorited.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(likeStatusUnfavorited.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.likes = action.payload?.article.favorited
    })
    builder.addCase(likeStatusUnfavorited.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch delete like:', action.payload)
    })
    //deleteArticleItem
    builder.addCase(deleteArticleItem.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(deleteArticleItem.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.likes = false
      state.openArticle = initialState.openArticle
    })
    builder.addCase(deleteArticleItem.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch delete article:', action.payload)
    })
    //editArticleItem
    builder.addCase(editArticleItem.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(editArticleItem.fulfilled, (state, action) => {
      state.status = 'resolved'
      state.articleForm = initialState.articleForm
    })
    builder.addCase(editArticleItem.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      console.error('Failed to fetch delete article:', action.payload)
    })
  },
})

export const {
  deleteOpenArticle,
  updateFormData,
  updateSignInFormData,
  changePersonalDataCheckbox,
  updateEditProfileFormData,
  logOutProfile,
  showPopUp,
  createArticleForm,
  createArticleFormTags,
  changeLikesStatus,
} = blogSlice.actions

export default blogSlice.reducer
