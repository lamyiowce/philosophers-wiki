#include "jsoncpp.cpp"
#include "json/json.h"
#include<iostream>
#include<vector>
#include<fstream>
#include<regex>
#include<algorithm>
#include<map>
#include<string>
using namespace std;
using namespace Json;

map<string, int> nums;
map<string, bool> bylo;
set< pair<int, int > > s;
int t; 
struct ziom {
	int id;
	string year, name;
};

ziom node[1000];
int trans[1000];
int inf[1000];
bool comp (ziom a, ziom b)
{
	if (a.year == b.year) 
		return a.name < b.name;
	return a.year < b.year;
}

int main ()
{
	Value root;
	ifstream input("sparql.json");
	input >> root;

	ofstream output("links.tsv");
	ofstream nodes("nodes0.tsv");
	Value links = root["results"]["bindings"];
	output << "source\ttarget" << endl;
	
	nodes << "name\tyear\tinf" << endl;
	int it = 0;
	for (int i = 0; i < links.size(); i++)
	{

	//	regex_search(links[i]["A"]["value"].asString(), a, reg);
		//regex_replace(a, dolnik, " ");
//		cout << "aaa" << endl;
		string aname = links[i]["A"]["value"].asString();
		string bname = links[i]["B"]["value"].asString();
		if (bylo.find(aname) == bylo.end())
		{
			bylo[aname] = 1;
			node[it].year = links[i]["YA"]["value"].asString();
			node[it].name = aname;
			node[it].id = it;
			nums[aname] = it++;

		} 
		if (bylo.find(bname) == bylo.end())
		{
			bylo[bname] = 1;
			node[it].year = links[i]["YB"]["value"].asString();
			node[it].name = bname;
			node[it].id = it;
			nums[bname] = it++;
		} 
		s.insert(make_pair(nums[aname], nums[bname]));
//		output << nums[aname] << '\t' << nums[bname] << endl;
	}
//	cout << "pozdro" << endl;
	sort(node, node+it, comp);
	for (int i = 0; i < it; i++) 
	{
		trans[node[i].id] = i;
	}
	for (auto a : s)
	{
		inf[trans[a.first]]++;
		output << trans[a.first] << '\t' << trans[a.second] << endl;
	}
	for (int i = 0; i < it; i++) 
	{
		nodes << node[i].name << "\t" << node[i].year << "\t" << inf[i] << endl;
	}
}