import { $fetch } from 'ohmyfetch/node'
import { Send } from '../../helpers/response.js'

/**
 * This is an example that demonstrates how verifying reCAPTCHA on the server side works.
 * Do not use this middleware in your production.
 */

export async function recaptcha (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  try {
    const { recaptcha } = req.body

    if (!recaptcha) {
      Send(res, 500, { status: 'failed' })
    }

    const response = await $fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
    )

    if (response.success) {
      next()
    } else {
      Send(res, 500, { status: 'failed' })
    }
  } catch (e) {
    console.log('ReCaptcha error:', e)
    Send(res, 500, { status: 'failed' })
  }
}
