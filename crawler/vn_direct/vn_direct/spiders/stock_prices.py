import scrapy
from datetime import date
import pandas as pd
import json


class StockPricesSpider(scrapy.Spider):
    name = 'stock_prices'
    base_url = 'https://finfo-api.vndirect.com.vn/v4/stock_prices?sort=date&q=code:'
    code = 'ACB'
    start_date = '2020-04-01'
    today = date.today()
    end_date = today.strftime("%Y-%m-%d")
    start_urls = [
        'https://finfo-api.vndirect.com.vn/v4/stock_prices?sort=date&q=code:' + code + '&size=15&page=1']

    def parse(self, response):
        print("response ==========")

        output = json.loads(response.text)

        data = output["data"]

        for item in data:
            yield item
        #     # if count == 0:
        #     #     # Writing headers of CSV file
        #     #     header = emp.keys()
        #     #     csv_writer.writerow(header)
        #     #     count += 1
        #
        #     # Writing data of CSV file
        #     yield item.values()

        # data_file.close()
        currentPage = output["currentPage"]
        # size = output["size"]
        # totalElements = output["totalElements"]
        totalPages = output["totalPages"]
        if currentPage < totalPages:
            nextpage = currentPage + 1
            # next_request = self.base_url + self.code + '~date:gte:' + self.start_date + '~date:lte:' + self.end_date + '&size=15&page=' + str(nextpage)
            next_request = self.base_url + self.code + '&size=15&page=' + str(nextpage)
            print(next_request)
            yield scrapy.Request(
                next_request,
                callback = self.parse)

            # yield data
