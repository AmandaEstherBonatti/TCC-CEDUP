import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FeedPostEntity } from 'src/app/feed/feeds.entity';
import { FeedService } from 'src/app/feed/feeds.service';
import { UsersEntity } from 'src/app/user/users.entity';
import { UsersService } from 'src/app/user/users.service';


@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private feedService: FeedService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: UsersEntity; params: { id: string } } = request;

    if (!user || !params) return false;

    if (user.role === 3) return true; // allow admins to get make requests

    const userId = user.id;
    const feedId = params.id;

    // Determine if logged-in user is the same as the user that created the feed post

    this.feedService.findOneOrFail(feedId)
    map((feedPost: FeedPostEntity) => {
      let isAuthor = user.id === feedPost.User.id;
      return isAuthor;
    })

  }
}
