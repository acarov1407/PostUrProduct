import Layout from "@/components/layout/Layout"
import RegisterForm from "@/components/form/RegisterForm"

function Register() {

    return (
        <Layout>
            <div className="max-w-md mx-auto">
                <h1 className="text-center text-3xl leading-relaxed text-gray-900 mb-6">Regístrate en
                    <span className="font-bold"> Post<span className="text-gray-600">Ur</span>Product
                    </span> y comienza a publicar productos
                </h1>
                <RegisterForm />
            </div>

        </Layout>
    )
}

export default Register