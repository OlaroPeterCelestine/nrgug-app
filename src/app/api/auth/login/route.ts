import { NextRequest, NextResponse } from 'next/server'

// Mock user data - replace with actual database lookup
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@nrgug.com',
    password: 'admin123', // In production, this should be hashed
    name: 'Administrator',
    role: 'admin'
  },
  {
    id: 2,
    email: 'albert@nrgug.com',
    password: '1234@12',
    name: 'Albert',
    role: 'admin'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = MOCK_USERS.find(u => u.email === email)

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password (in production, use proper password hashing)
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(JSON.stringify({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    })).toString('base64')

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
