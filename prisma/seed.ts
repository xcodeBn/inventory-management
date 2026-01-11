import {prisma} from "@/lib/prisma";

async function main() {
    const demoUserId = "358dea79-af94-4ae2-b87e-efc63d77dfbdn"

    await prisma.product.createMany({
        data: Array.from({length:25}).map((_,i) => ({
            userId : demoUserId,
            name: `Product ${i+1}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random()*20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000*60*60*24* (i*5)),
        }))
    })

    console.log("Db seeded succesfully")
}


main()
.catch((e)=>{
    console.log(e);
    process.exit(1);
})
.finally(async ()=>{
    await prisma.$disconnect();
})