import Layout from "@/components/layout/Layout"
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import useAuth from "@/context/auth/useAuth";
import MyError from "@/components/auxiliary/MyError";

function EmailVerification() {

  const { authUser } = useAuth();

  const showPage = authUser && !authUser.emailVerified;


  return (
    <Layout>
      {
        showPage
          ?
          <div className="text-center max-w-lg mx-auto">
            <EnvelopeIcon className="h-20 w-20 mx-auto" />
            <h1 className="text-3xl font-medium mt-2">Verifica tu Cuenta en PostUrProduct</h1>

            <p className="text-xl mt-4">Hemos enviado un email a la dirección de correo:
              <span className="text-lg font-medium block">{` ${authUser.email} `}</span>
              con un enlace para que actives tu cuenta.
            </p>
          </div>
          :
          <MyError />
      }

    </Layout>
  )
}

export default EmailVerification