```typescript
controller
@Post()
create(...) {}

@Get()
getAll(){}

@Get(':id')
getById(){}

@Put(':id')
update(...) {}

@Delete(':id')
delete(...) {}


@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreatePageDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.create(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.allPages(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.getPageById(id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdatePageDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.update({ id, name: body.name }, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.pagesService.delete({ id }, userId);
  }
}

```
