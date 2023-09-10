import { Injectable } from '@nestjs/common';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const newReport = this.repo.create(reportDto);
    newReport.user = user;

    return this.repo.save(newReport);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    // return this.repo.createQueryBuilder().select('*').getRawMany();

    return (
      this.repo
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        // .select('price', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawMany()
    );
  }
}
