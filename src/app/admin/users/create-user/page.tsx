
import { CreateUserForm } from "@/app/admin/users/create-user/create-user-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const CreateProduct = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add new user to table</CardTitle>
                    <CardDescription>
                        Enter information of user below to add user to table
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateUserForm />
                </CardContent>
            </Card>
        </div>
    )
}
export default CreateProduct