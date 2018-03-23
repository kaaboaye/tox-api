import { ServerRoute } from "hapi";
import { TestList } from "../entity/TestList";
import { concat } from "joi";

export const List: ServerRoute[] = [];
const path = '/list';

List.push({
    path: path,
    method: 'get',
    handler: async (requset, h) => {
        return TestList.find({
            relations: ['prev']
        });
    }
});

List.push({
    path: path + '/find/{id}',
    method: 'get',
    handler: async (requset, h) => {
        const { id } = requset.params;

        const res = await TestList.findOneById(id, {
            relations: ['prev']
        });

        if (res) {
            return res;
        }

        return { code: 404 };
    }
});


List.push({
    path: path + '/history/{id}',
    method: 'get',
    handler: async (requset, h) => {
        const { id } = requset.params;

        const item = await TestList.findOneById(id, {
            relations: ['prev']
        });

        return item.History();
    }
});

List.push({
    path: path + '/new/{text}',
    method: 'get',
    handler: async (requset, h) => {
        const { text } = requset.params;

        const it = new TestList();
        it.text = text;

        await it.save();

        return it;
    }
});

List.push({
    path: path + '/update/{id}/{text}',
    method: 'get',
    handler: async (requset, h) => {
        const { id, text } = requset.params;

        const it = await TestList.findOneById(id);

        if (!it) {
            return { code: 404 };
        }

        await it.Update({ text });

        return it;
    }
});

List.push({
    path: path + '/del',
    method: 'get',
    handler: async (requset, h) => {
        TestList.clear();

        return 1;
    }
});