function HomePage() {
    return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
        <div className="max-w-md">
        <h1 className="text-5xl font-bold">Let's Get Working!</h1>
        <p className="py-6">
            Press the button below or the login/registration button at the top to get started.
        </p>
        <a href="/login">
            <button className="btn btn-primary">Get Started</button>
        </a>
        </div>
    </div>
    </div>
    )
}

export default HomePage;