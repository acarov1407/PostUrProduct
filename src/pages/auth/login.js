import Layout from "@/components/layout/Layout"
import LoginForm from "@/components/form/LoginForm";


function Login() {

    return (
        <Layout>
            <div className="max-w-md mx-auto">
                <h1 className="text-center text-3xl leading-relaxed text-gray-900 mb-6">Inicia sesión y comienza a publicar productos</h1>
                <LoginForm />
            </div>
        </Layout>
    )
}

export default Login