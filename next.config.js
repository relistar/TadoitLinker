const withPWA = require('next-pwa')

module.exports = withPWA({
    images: {
        domains: ['res.cloudinary.com'],
    },
    env: {
        config: {
            development: {
                api: {
                    root: "http://localhost:3000/api/",
                    base: "https://tadoit-strapi.herokuapp.com/"
                },
                sessionCookieConfig: {
                    cookieName: 'sc',
                    password: "XSJ7BwPjX7GDH?Xk@yrc*CB2VBB%u+EUGsApKC=_5Cw!ZM+4HCY6",
                    cookieOptions: {
                        secure: false,
                        httpOnly: false,
                        sameSite: 'Strict',
                        maxAge: 86400
                    }
                }
            },
            docker: {
                api: {
                    root: "http://localhost:3000/api/",
                    base: "https://tadoit-strapi.herokuapp.com/"
                },
                sessionCookieConfig: {
                    cookieName: 'sc',
                    password: "%uUtSp47RhWPNsr^Qk@$BzHhXg98F74%Svs6awVh$xMY5nMxn5VP",
                    cookieOptions: {
                        secure: false,
                        httpOnly: false,
                        sameSite: 'Strict',
                        maxAge: 86400
                    }
                }
            },
            production: {
                api: {
                    root: "https://tadoit-linker.vercel.app/api/",
                    base: "https://tadoit-strapi.herokuapp.com/"
                },
                sessionCookieConfig: {
                    cookieName: 'sc',
                    password: "LyTZHt+MrF7rykP8&F2wNz9grgf##29?#vcwQggp?kjJ^LmxBrsQ",
                    cookieOptions: {
                        secure: true,
                        httpOnly: false,
                        sameSite: 'Strict',
                        maxAge: 86400
                    }
                }
            },
            vercel: {
                api: {
                    root: "https://tadoit-linker.vercel.app/api/",
                    base: "https://tadoit-strapi.herokuapp.com/"
                },
                sessionCookieConfig: {
                    cookieName: 'sc',
                    password: "-56&Rq_L2WM2=GmnsH_3eNc9MBHcjFSZudsNGLtPGJD+YAtmaL+-",
                    cookieOptions: {
                        secure: true,
                        httpOnly: false,
                        sameSite: 'Strict',
                        maxAge: 86400
                    }
                }
            }
        },
        NEXT_PUBLIC_VERCEL: false
    },
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        sw: 'service-worker.js'
    }
})