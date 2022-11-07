export default function ({ redirect, $auth }) {
    // If the user is not authenticated
    if (!$auth.loggedIn) {
      return redirect('/auth/login')
    }
  }