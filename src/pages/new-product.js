import Layout from "@/components/layout/Layout"
import ProtectedLayout from "@/components/layout/ProtectedLayout"
import NewProductForm from "@/components/form/NewProductForm"

function NewProduct() {

  return (
    <Layout>
      <ProtectedLayout>
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-bold mb-5">Nuevo Producto</h1>
          <NewProductForm />
        </div>
      </ProtectedLayout>
    </Layout>
  )
}

export default NewProduct 