// flower service request router
import express, { Router } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { flowerDeliveryRequest } from "common/src/backend_interfaces/flowerServiceRequest.ts";

const router: Router = express.Router();

router.post("/", async function (req, res) {
  const flower: flowerDeliveryRequest = req.body;

  try {
    const serviceRequest = await PrismaClient.serviceRequest.create({
      data: {
        employeeName: flower.employeeName,
        priority: flower.priority,
        location: flower.location,
        status: flower.status,
        serviceType: flower.serviceType,
        description: flower.description,
      },
    });

    await PrismaClient.flowerServiceRequest.upsert({
      where: {
        SRID: serviceRequest.SRID,
      },
      create: {
        SRID: serviceRequest.SRID,
        flowerType: flower.flowerType,
        senderName: flower.senderName,
        receiverName: flower.receiverName,
        deliveryDate: flower.deliveryDate,
      },
      update: {
        flowerType: flower.flowerType,
        senderName: flower.senderName,
        receiverName: flower.receiverName,
        deliveryDate: flower.deliveryDate,
      },
    });

    res
      .status(200)
      .json({ message: "Flower Request has been put into the database" });
    console.log("Successfully posted to flower");
  } catch (error) {
    console.error("Unable to create form");
    console.log(error);
    res.sendStatus(204);
    return;
  }
});

router.get("/", async function (req, res) {
  const flowerForm = await PrismaClient.flowerServiceRequest.findMany({
    include: {
      ServiceRequest: true,
    },
  });
  res.json(flowerForm);
});

export default router;
