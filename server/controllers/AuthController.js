import getPrismaInstance from "../utils/PrismaClient.js"

export const checkUser = async (req, res, next) => {
    try {
        const { email, } = req.body

        if (!email) {
            return res.status(500).json({
                msg: "Email is required",
                success: false
            })

        }
        const prisma = getPrismaInstance()
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })


        if (!user) {
            return res.status(500).json({
                msg: "User not found",
                success: false
            })
        }
        else {
            return res.status(200).json({
                msg: "User found",
                success: true,
                data: user
            })
        }

    } catch (err) {
        next(err)
    }
}