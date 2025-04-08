import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import validateForm from '../utils/index'

interface Article {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  article: any
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  favoritesCount: number
  favorited: boolean
  author: { username: string; image: string }
}

interface BlogState {
  dataArticles: Article[]
  articlesCount: number
  status: 'loading' | 'resolved' | 'rejected' | null
  error: string | null
  isLoggedIn: boolean
  openArticle: Partial<Article>
  email: string | null
  username: string
  avatarImage: string
  token: string | null
  id: string | null
  signUpForm: {
    username: string
    email: string
    password: string
    repeatPassword: string
  }
  isValid: boolean
  personaDataCheckbox: boolean
  isRegistered: boolean
  signInForm: { email: string; password: string }
  editProfileForm: {
    username: string
    email: string
    password: string
    image: string
  }
  popUp: boolean
  articleForm: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
  likes: boolean
  paginationPage: number
}

const initialState: BlogState = {
  dataArticles: [],
  articlesCount: 0,
  status: null,
  error: null,
  isLoggedIn: false,
  openArticle: {},
  email: null,
  username: '',
  avatarImage: '',
  token: null,
  id: null,
  signUpForm: { username: '', email: '', password: '', repeatPassword: '' },
  isValid: false,
  personaDataCheckbox: false,
  isRegistered: false,
  signInForm: { email: '', password: '' },
  editProfileForm: { username: '', email: '', password: '', image: '' },
  popUp: false,
  articleForm: { title: '', description: '', body: '', tagList: [] },
  likes: false,
  paginationPage: 1,
}

interface EditArticleForm {
  title: string
  description: string
  body: string
}

interface EditArticlePayload {
  id: string
  editForm: EditArticleForm
}

interface ArticlesResponse {
  articles: Article[]
  articlesCount: number
}

interface User {
  email: string
  token: string
  username: string
  bio: string | null
  image: string | null
}

interface UserResponse {
  user: User
}

// Тип формы регистрации
interface SignUpForm {
  username: string
  email: string
  password: string
}
interface SignInForm {
  email: string
  password: string
}
interface EditProfileForm {
  username?: string
  email?: string
  password?: string
  image?: string
}

interface ArticleForm {
  title: string
  description: string
  body: string
  tagList: string[]
}
//Получение статей
export const getArticles = createAsyncThunk<
  ArticlesResponse,
  void,
  { rejectValue: string }
>('blog/GetArticles', async function (_, { rejectWithValue }) {
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
})

//Получение статей через пагинацию
export const GetTicketsPage = createAsyncThunk<
  ArticlesResponse,
  number,
  //   BlogState,
  { rejectValue: string }
>(
  'blog/GetTicketsPage',
  //   async function (pageNumber: number, { rejectWithValue }) {
  async function (page, { rejectWithValue }) {
    //  console.log(page)
    const pageNumber = page === 1 ? page : Number(localStorage.getItem('page'))
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
      return rejectWithValue((err as Error).message)
    }
  },
)

export const getArticle = createAsyncThunk<
  Article,
  string,
  { rejectValue: string }
>('blog/getArticle', async function (id: string, { rejectWithValue }) {
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
})

export const userRegistration = createAsyncThunk<
  UserResponse,
  SignUpForm,
  { rejectValue: string }
>(
  'blog/userRegistration',
  async function (signUpForm: SignUpForm, { rejectWithValue }) {
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
      const data: UserResponse = await res.json()
      return data
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const updateCurrentUser = createAsyncThunk<
  UserResponse,
  EditProfileForm,
  { rejectValue: string }
>(
  'blog/updateCurrentUser',
  async function (editProfileForm: EditProfileForm, { rejectWithValue }) {
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
      alert(
        'Что-то пошло не так, попробуйте перезагрузить страницу и попробовать снова.',
      )
      return rejectWithValue((err as Error).message)
    }
  },
)

export const authorization = createAsyncThunk<
  UserResponse,
  SignInForm,
  { rejectValue: string }
>(
  'blog/authorization',
  async function (signInForm: SignInForm, { rejectWithValue }) {
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
      const data: UserResponse = await res.json()
      return data
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const checkToken = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: string }
>('blog/checkToken', async function (_, { rejectWithValue }) {
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
      return rejectWithValue((err as Error).message)
    }
  }
})

export const createArticle = createAsyncThunk<
  Article,
  ArticleForm,
  { rejectValue: string }
>(
  'blog/createArticle',
  async function (articleForm: ArticleForm, { rejectWithValue }) {
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
      return rejectWithValue((err as Error).message)
    }
  },
)

export const likeStatusFavorited = createAsyncThunk<
  Article,
  string,
  { rejectValue: string }
>('blog/likeStatusFavorited', async function (id: string, { rejectWithValue }) {
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
    return rejectWithValue((err as Error).message)
  }
})

export const likeStatusUnfavorited = createAsyncThunk<
  Article,
  string,
  { rejectValue: string }
>(
  'blog/likeStatusUnfavorited',
  async function (id: string, { rejectWithValue }) {
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
      return rejectWithValue((err as Error).message)
    }
  },
)

export const deleteArticleItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('blog/deleteArticle', async function (id: string, { rejectWithValue }) {
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
})

export const editArticleItem = createAsyncThunk<
  Article,
  EditArticlePayload,
  { rejectValue: string }
>(
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
    setUser: (
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>,
    ) => {
      state.email = action.payload.email
      state.token = action.payload.token
      state.id = action.payload.id
    },
    removeUser: (state) => {
      state.email = null
      state.token = null
      state.id = null
    },
    //  updateFormData: (state, action) => {
    //    state.signUpForm = { ...state.signUpForm, ...action.payload }
    //    state.isValid = validateForm(state.signUpForm)
    //  },
    changePersonalDataCheckbox: (state) => {
      state.personaDataCheckbox = !state.personaDataCheckbox
    },
    updateSignInFormData: (
      state,
      action: PayloadAction<Partial<BlogState['signInForm']>>,
    ) => {
      state.signInForm = { ...state.signInForm, ...action.payload }
    },
    updateEditProfileFormData: (
      state,
      action: PayloadAction<Partial<BlogState['editProfileForm']>>,
    ) => {
      state.editProfileForm = { ...state.editProfileForm, ...action.payload }
    },
    createArticleForm: (
      state,
      action: PayloadAction<Partial<BlogState['articleForm']>>,
    ) => {
      state.articleForm = { ...state.articleForm, ...action.payload }
    },
    createArticleFormTags: (state, action: PayloadAction<string>) => {
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
    changePaginationPage: (state, action: PayloadAction<number>) => {
      console.log(action.payload)
      state.paginationPage = action.payload
      localStorage.setItem('page', String(action.payload))
    },
    //весь функционал экшэнов
  },
  extraReducers: (builder) => {
    //getArticles
    builder.addCase(getArticles.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(
      getArticles.fulfilled,
      (
        state,
        action: PayloadAction<{ articles: Article[]; articlesCount: number }>,
      ) => {
        state.status = 'resolved'
        state.articlesCount = action.payload?.articlesCount || 0
        state.dataArticles = action.payload?.articles || []
      },
    )
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
    builder.addCase(
      GetTicketsPage.fulfilled,
      (state, action: PayloadAction<ArticlesResponse>) => {
        state.status = 'resolved'
        state.dataArticles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      },
    )
    builder.addCase(GetTicketsPage.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload || 'Failed to fetch articles'
    })
    //getArticle
    builder.addCase(getArticle.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(
      getArticle.fulfilled,
      (state, action: PayloadAction<Article>) => {
        state.status = 'resolved'
        state.likes = action.payload?.article.favorited
        state.openArticle = action.payload?.article || {}
      },
    )
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
    builder.addCase(
      authorization.fulfilled,
      (state, action: PayloadAction<UserResponse>) => {
        state.status = 'resolved'
        state.username = action.payload?.user.username
        state.token = action.payload?.user.token
        state.email = action.payload?.user.email
        state.avatarImage = action.payload?.user.image
        localStorage.setItem('token', action.payload?.user.token)
        state.isLoggedIn = true
        state.signInForm = initialState.signInForm
      },
    )
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
    builder.addCase(deleteArticleItem.fulfilled, (state) => {
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
    builder.addCase(editArticleItem.fulfilled, (state) => {
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

// eslint-disable-next-line react-refresh/only-export-components
export const {
  deleteOpenArticle,
  //   updateFormData,
  updateSignInFormData,
  changePersonalDataCheckbox,
  updateEditProfileFormData,
  logOutProfile,
  showPopUp,
  createArticleForm,
  createArticleFormTags,
  changeLikesStatus,
  changePaginationPage,
} = blogSlice.actions

export default blogSlice.reducer
