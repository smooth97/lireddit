import {
    Resolver,
    Query,
    Ctx,
    Arg,
    Mutation,
    InputType,
    Field,
    UseMiddleware,
    Int,
    FieldResolver,
    Root,
} from "type-graphql";
import {Post} from "../entities/Post";
import {MyContext} from "src/types";
import {isAuth} from "../middleware/isAuth";
import {getConnection} from "typeorm";

@InputType()
class PostInput {
    @Field()
    title: string;
    @Field()
    text: string;
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => String)
    textSnippet(@Root() root: Post) {
        return root.text.slice(0, 50)
    }

    @Query(() => [Post])
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
    ): Promise<Post[]> {
        const realLimit = Math.min(50, limit);

        const qb = getConnection()
            .getRepository(Post)
            .createQueryBuilder("p")
            .orderBy('"createdAt"', 'DESC')
            .take(realLimit);

        if (cursor) {
            qb.where('"createdAt" < :cursor', {cursor: new Date(parseInt(cursor))})
        }

        return qb.getMany();
    }

    // list item
    @Query(() => Post, {nullable: true})
    post(@Arg("id") id: number): Promise<Post | undefined> {
        return Post.findOne(id);
    }

    // create
    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() {req}: MyContext
    ): Promise<Post> {
        return Post.create({
            ...input,
            creatorId: req.session.userId,
        }).save();
    }

    // update
    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String, {nullable: true}) title: string
    ): Promise<Post | null> {
        const post = await Post.findOne(id);

        if (!post) {
            return null;
        }

        if (typeof title !== "undefined") {
            await Post.update({id}, {title});
        }

        return post;
    }

    // delete
    @Mutation(() => Boolean)
    async deletePost(@Arg("id") id: number): Promise<Boolean> {
        await Post.delete(id);
        return true;
    }
}
