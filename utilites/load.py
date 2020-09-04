"""

    @author Maksim Sandybekov
    @date 2.09.2020
"""

import os, csv, requests
from urllib.parse import urljoin
import shapefile



class DataLoader:
    """
        Initializes the bin positions using the csv file in the assets folder. 
    """

    def __init__(self, token, api_base = "http://localhost:8000"):
        """

            Arguments:
                token (str): Authentication token for API access
                api_base (str): Base url for API requests to insert new data.

        """

        # Path to example bin file 
        self.DATA_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "assets", "data")
        self.BIN_CSV_PATH = os.path.join(self.DATA_PATH, "bin_kn.csv")
        self.token = token
        self.api_base = api_base

    
    def load(self):
        """
            Insert data into the database
        """
        self.__load_bins()


    def __load_data(self):
         with open(self.FILE_PATH, newline="") as csvfile:
            bin_reader = csv.reader(csvfile, delimiter=';', quotechar='|')

            # Use endpointsto insert bins and bin types
            bin_url = urljoin(self.api_base, "bin")
            bin_type_url = urljoin(bin_url, "type")


            # Track unique data
            bin_types = {}
            for row in bin_reader:

                # Insert bin type if non-existen 
                bin_type = row[1]
                if bin_types.get(bin_type) != True:
                    bin_types[bin_type] = True
                    bin_type_data = {"name": bin_type}
                    self.__insert(bin_type_url, bin_type_data)



    def __insert(self, url, data):
        """
            Issue an POST request against an api endpoint.
        """
        requests.post(url, data, headers = {"Authorization": "JWT " + self.token})





if __name__ == '__main__':

    data = DataLoader()
    data.load()