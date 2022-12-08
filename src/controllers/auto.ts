import { Auto } from "../db/auto";
import * as express from "express";

// Получить все машины
const autos_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let sort = null;
    switch (req.query.sort) {
      case "brandUp":
        sort = { brand: 1 };
        break;
      case "brandDown":
        sort = { brand: -1 };
        break;
      case "nameUp":
        sort = { name: 1 };
        break;
      case "nameDown":
        sort = { name: -1 };
        break;
      case "prodDateUp":
        sort = { prodDate: 1 };
        break;
      case "prodDateDown":
        sort = { prodDate: -1 };
        break;
      case "priceUp":
        sort = { price: 1 };
        break;
      case "priceDown":
        sort = { price: -1 };
        break;

      default:
        break;
    }

    const autos = await Auto.find({ status: "actual" }).sort(sort);
    res.send(autos);
  } catch (error) {
    next(error);
  }
};

// Получить одну машину по id
const auto_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const auto = await Auto.findById(req.query.id).populate("oldVersions");
    if (!auto) {
      throw new Error();
    }
    res.send(auto);
  } catch (error) {
    next(error);
  }
};

// Добавить машину
const auto_post = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const auto = await Auto.create(req.body);
    if (!auto) {
      throw new Error();
    }
    res.send(auto);
  } catch (error) {
    next(error);
  }
};

// Изменить машину
const auto_put = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let autoToUpd = await Auto.findById(req.body.id);
    if (autoToUpd.status === "deprecated") {
      throw new Error("Изменение устаревших данных запрещено");
    }

    const { brand, name, prodDate, price } = autoToUpd;

    if (req.body.data.prodDate === null) {
      throw new Error("Некорректная дата");
    }

    const oldAuto = new Auto({
      brand,
      name,
      prodDate,
      price,
      status: "deprecated",
    });

    autoToUpd = await Auto.findByIdAndUpdate(autoToUpd._id, req.body.data, {
      new: true,
    }).populate("oldVersions");

    if (!autoToUpd) {
      throw new Error();
    }

    autoToUpd.oldVersions.push(oldAuto._id);
    oldAuto.save();
    await autoToUpd.save();

    res.send(autoToUpd);
  } catch (error) {
    next(error);
  }
};

// Удалить машину
const auto_delete = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let auto = await Auto.findById(req.query.id);
    if (auto.status === "deprecated") {
      throw new Error("Удаление устаревших данных запрещено");
    }
    auto = await Auto.findByIdAndDelete(req.query.id);
    auto.oldVersions.map(async (v) => {
      await Auto.findByIdAndRemove(v);
    });
    if (!auto) {
      throw new Error("Не найден");
    }
    res.send(auto);
  } catch (error) {
    next(error);
  }
};

export { autos_get, auto_get, auto_post, auto_put, auto_delete };
