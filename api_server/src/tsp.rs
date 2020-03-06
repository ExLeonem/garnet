extern crate rand;
extern crate simplelog;
extern crate darwin_rs;

use super::models::Trashcan;
use std::sync::Arc;
use rand::Rng;
use simplelog::{SimpleLogger, LogLevelFilter, Config};
use darwin_rs::{Individual, SimulationBuilder, Population, PopulationBuilder, simulation_builder};

pub fn compute_tsp(trashcans: Vec<Trashcan>) -> Vec<(f64, f64)> {
    let mut coordinates = Vec::new();
    for i in 0..trashcans.len() {
        coordinates.push((trashcans[i].latitude, trashcans[i].longitude))
    } 
    run_tsp(&coordinates)
}

fn run_tsp(trashcans: &Vec<(f64, f64)>) -> Vec<(f64, f64)> {

    let mut result_vec = Vec::new();

    println!("Darwin test: traveling salesman problem");
    let _ = SimpleLogger::init(LogLevelFilter::Info, Config::default());

    let tsp = SimulationBuilder::<CityItem>::new()
        // .factor(0.34)
        .fitness(459.0)
        .threads(4)
        .add_multiple_populations(make_all_populations(100, 8, &trashcans))
        .finalize();

    match tsp {
        Err(simulation_builder::Error(simulation_builder::ErrorKind::EndIterationTooLow, _)) => println!("more than 10 iteratons needed"),
        Err(e) => println!("unexpected error: {}", e),
        Ok(mut tsp_simulation) => {

            tsp_simulation.run();
            tsp_simulation.print_fitness();

            println!("**** Path and coordinates: ");
            for index in &tsp_simulation.simulation_result.fittest[0].individual.path {
                let (x, y) = trashcans[*index];
                result_vec.push((x,y));
                println!("{} {}", x, y);
            }
            //println!("total run time: {} ms", tsp_simulation.total_time_in_ms);
            //println!("improvement factor: {}",
            //    tsp_simulation.simulation_result.improvement_factor);
            //println!("number of iterations: {}",
            //    tsp_simulation.simulation_result.iteration_counter);
        }
    }
    result_vec
}

fn make_population(count: u32, cities: &Vec<(f64, f64)>) -> Vec<CityItem> {
    let mut result = Vec::new();
    let shared = Arc::new(cities.clone());
    let mut path: Vec<usize> = (0..cities.len()).map(|x| x as usize).collect();
    path.push(0); // Add start position to end of path

    for _ in 0..count {
        result.push( CityItem {
                path: path.clone(),
                cities: shared.clone()
            }
        );
    }
    result
}

fn make_all_populations(individuals: u32, populations: u32, cities: &Vec<(f64, f64)>) -> Vec<Population<CityItem>> {
    let mut result = Vec::new();
    let initial_population = make_population(individuals, &cities);

    for i in 1..(populations + 1) {
        let pop = PopulationBuilder::<CityItem>::new()
            .set_id(i)
            .initial_population(&initial_population)
            .mutation_rate((1..10).cycle().take(individuals as usize).collect())
            .reset_limit_increment(100 * i)
            .reset_limit_start(100 * i)
            .reset_limit_end(1000 * i)
            .finalize().unwrap();

        result.push(pop)
    }
    result
}

#[derive(Debug, Clone)]
struct CityItem {
    path: Vec<usize>,
    cities: Arc<Vec<(f64, f64)>>
}

fn city_distance(city: &[(f64, f64)], index1: usize, index2: usize) -> f64 {
    let (x1, y1) = city[index1];
    let (x2, y2) = city[index2];
    let x = x2 - x1;
    let y = y2 - y1;

    x.hypot(y)
}

// Implement trait functions mutate and calculate_fitness:
impl Individual for CityItem {
    fn mutate(&mut self) {
        let mut rng = rand::thread_rng();
        // Keep stating position always the same: (random numbers from 1, not 0)
        let index1: usize = rng.gen_range(1, self.cities.len());
        let mut index2: usize = rng.gen_range(1, self.cities.len());

        // Small optimisation
        while index1 == index2 {
            index2 = rng.gen_range(1, self.cities.len());
        }
        // Here we just swap the two indices. Compare this to example/tsp2 where we have
        // a second mutation operation and the results are much better.
        self.path.swap(index1, index2);
    }

    // fitness means here: the length of the route, the shorter the better
    fn calculate_fitness(&mut self) -> f64 {
        let mut prev_index = &(self.cities.len() - 1);
        let mut length: f64 = 0.0;

        for index in &self.path {
            length += city_distance(&self.cities, *prev_index, *index);
            prev_index = index;
        }
        // Seconds, Nanoseconds
        // sleep(Duration::new(0, 100000));
        length
    }

    fn reset(&mut self) {
        let mut path: Vec<usize> = (0..self.cities.len()).map(|x| x as usize).collect();
        path.push(0); // Add start position to end of path
        self.path = path;
    }
}